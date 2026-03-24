using Application.DTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories.Interfaces;

namespace Application.Services
{
    /// <summary>
    /// Serviço responsável por realizar as operações e validações envolvendo o Usuário
    /// </summary>
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public void Create(NewUserDTO user)
        {
            var newUser = _mapper.Map<User>(user);
            _userRepository.Create(newUser);
        }
    }
}
