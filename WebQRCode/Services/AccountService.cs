using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Text.Json;
using WebApiQRCode.Constants;
using WebApiQRCode.Data.Entities.Identity;
using WebApiQRCode.Interfaces;
using WebApiQRCode.Models.Account;

namespace WebApiQRCode.Services;

public class AccountService(UserManager<UserEntity> userManager,
    IImageService imageService,
    IJwtTokenService jwtTokenService) : IAccountService
{
    public async Task<string> LoginByGoogle(string token)
    {
        //Клієнт для запитів на Google
        using var httpClient = new HttpClient();

        httpClient.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", token);

        //configuration
        string userInfo = "https://www.googleapis.com/oauth2/v2/userinfo";
        var response = await httpClient.GetAsync(userInfo);

        if (!response.IsSuccessStatusCode)
            return null;

        var json = await response.Content.ReadAsStringAsync();

        var googleUser = JsonSerializer.Deserialize<GoogleAccountModel>(json);

        var existingUser = await userManager.FindByEmailAsync(googleUser.Email);
        if(existingUser != null) //Якщо користувач уже є в БД
        {
            var userLoginGoogle = await userManager.FindByLoginAsync("Google", googleUser.GoogleId);
            if (userLoginGoogle == null)
            {
                await userManager.AddLoginAsync(existingUser, new UserLoginInfo("Google", googleUser.GoogleId, "Google"));
            }
            var jwtToken = await jwtTokenService.CreateTokenAsync(existingUser);
            return jwtToken;
        }
        else
        {
            var user = new UserEntity
            {
                Email = googleUser.Email,
                UserName = googleUser.Email,
                FirstName = googleUser.FirstName,
                LastName = googleUser.LastName
            };
            if(!String.IsNullOrEmpty(googleUser.Picture))
                user.Image = await imageService.SaveImageFromUrlAsync(googleUser.Picture);
            
            var result = await userManager.CreateAsync(user); //Користувач,який входить через google без пароля
            if(result.Succeeded)
            {
                await userManager.AddLoginAsync(user, 
                    new UserLoginInfo("Google", googleUser.GoogleId, "Google"));

                await userManager.AddToRoleAsync(user, Roles.User);
                var jwtToken = await jwtTokenService.CreateTokenAsync(user);
                return jwtToken;
            }
        }
        return String.Empty;
    }
}
 