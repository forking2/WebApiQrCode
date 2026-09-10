namespace WebApiQRCode.Interfaces;

public interface IImageService
{
    Task<string> SaveOptimizedImageAsync(IFormFile file);
    
    Task<string> SaveImageFromUrlAsync(string imageUrl);
    Task<string> SaveOptimizedImageAsync(string base64Image);
    Task RemoveImageAsync(string imageName);
}