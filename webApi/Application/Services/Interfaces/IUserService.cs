using Application.DTOs.UserDTOs;

namespace Application.Services.Interfaces
{
    /// <summary>
    /// Interface que delimita as funções que o Controller terá acesso
    /// </summary>
    public interface IUserService
    {
        public void Create(UserDTO user);
        public void Update(Guid id, UserDTO user);
        public void Delete(Guid id);
        public IList<UserListDTO> GetAll();
        public UserDTO GetById(Guid id);
    }
}
