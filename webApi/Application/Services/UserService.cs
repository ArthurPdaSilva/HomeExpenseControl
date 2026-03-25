using Application.DTOs.UserDTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories.Interfaces;
using FluentValidation;

namespace Application.Services
{
    /// <summary>
    /// Serviço responsável por realizar as operações e validações envolvendo o Usuário
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IValidator<UserDTO> _validator;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper, IValidator<UserDTO> validator)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task CreateAsync(UserDTO user)
        {
            //To validando o usuário usando o fluent api e se der algum erro, eu lanço uma exceção
            await _validator.ValidateAndThrowAsync(user);
            var newUser = _mapper.Map<User>(user);
            await _userRepository.CreateAsync(newUser);
        }

        public async Task UpdateAsync(Guid id, UserDTO user)
        {
            //Verificando se o usuário realmente existe
            var userOrigin = await _userRepository.GetByIdAsync(id);
            if (userOrigin is null)
            {
                throw new Exception("Usuário não encontrado");
            }


            await _validator.ValidateAndThrowAsync(user);
            //Mapeando os atributos mudados para o usuário já encontrado, para não dar erro no update
            _mapper.Map(user, userOrigin);
            await _userRepository.UpdateAsync(userOrigin);
        }

        public async Task DeleteAsync(Guid id)
        {
            //Verificando se o usuário realmente existe
            var userOrigin = await _userRepository.GetByIdAsync(id);
            if (userOrigin is null)
            {
                throw new Exception("Usuário não encontrado");
            }


            await _userRepository.DeleteAsync(userOrigin);
        }

        public async Task<IList<UserListDTO>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IList<UserListDTO>>(users);
        }

        public async Task<UserDTO> GetByIdAsync(Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user is null)
            {
                throw new Exception("Usuário não encontrado");
            }
            return _mapper.Map<UserDTO>(user);
        }
    }
}