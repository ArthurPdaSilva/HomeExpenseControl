using Application.DTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Migrations;
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

        public void Create(UserDTO user)
        {
            //To validando o usuário usando o fluent api e se der algum erro, eu lanço uma exceção
            _validator.ValidateAndThrow(user);
            var newUser = _mapper.Map<User>(user);
            _userRepository.Create(newUser);
        }

        public void Update(Guid id, UserDTO user)
        {
            //Verificando se o usuário realmente existe
            var userOrigin = _userRepository.GetById(id);
            if (userOrigin is null)
            {
                throw new Exception("Usuário não encontrado");
            }


            _validator.ValidateAndThrow(user);
            //Mapeando os atributos mudados para o usuário já encontrado, para não dar erro no update
            _mapper.Map(user, userOrigin);
            _userRepository.Update(userOrigin);
        }

        public void Delete(Guid id)
        {
            //Verificando se o usuário realmente existe
            var userOrigin = _userRepository.GetById(id);
            if (userOrigin is null)
            {
                throw new Exception("Usuário não encontrado");
            }


            _userRepository.Delete(userOrigin);
        }

        public IList<UserListDTO> GetAll()
        {
            var users = _userRepository.GetAll();
            return _mapper.Map<IList<UserListDTO>>(users);
        }

        public UserDTO GetById(Guid id)
        {
            var user = _userRepository.GetById(id);
            if (user is null)
            {
                throw new Exception("Usuário não encontrado");
            }
            return _mapper.Map<UserDTO>(user);
        }
    }
}
