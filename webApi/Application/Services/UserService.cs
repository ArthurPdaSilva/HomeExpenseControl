using Application.DTOs;
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

        public void Create(UserDTO user)
        {

            _validator.ValidateAndThrow(user);
            var newUser = _mapper.Map<User>(user);
            _userRepository.Create(newUser);
        }

        public void Update(Guid id, UserDTO user)
        {
            var userOrigin = _userRepository.GetById(id);
            if (userOrigin is null)
            {
                throw new Exception("Usuário não encontrado");
            }


            _validator.ValidateAndThrow(user);
            _mapper.Map(user, userOrigin);
            _userRepository.Update(userOrigin);
        }
    }
}
