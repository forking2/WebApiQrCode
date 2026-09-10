using Microsoft.AspNetCore.Identity;
using WebApiQRCode.Data.Entities.Identity;

namespace WebQRCode.Data.Entities.Identity;

public class UserRoleEntity : IdentityUserRole<int>
{
    public UserEntity User { get; set; } = null!;
    public RoleEntity Role { get; set; } = null!;
}
 