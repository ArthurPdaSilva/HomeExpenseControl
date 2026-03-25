using Application.DTOs.UserDTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções que o Controller terá acesso
    /// </summary>
    public interface IUserService : IGenericService<UserDTO, UserListDTO>
    {
    }
}
