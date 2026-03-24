using Application.DTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções que o Controller terá acesso
    /// </summary>
    public interface IUserService
    {
        public void Create(NewUserDTO user);
    }
}
