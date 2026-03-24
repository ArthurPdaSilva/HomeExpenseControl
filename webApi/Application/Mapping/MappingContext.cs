using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Mapping
{
    /// <summary>
    /// Classe responsável por mapear/transformar os DTO's em Entidades Persistidas ou vice-versa
    /// </summary>
    public class MappingContext : Profile
    {
        public MappingContext()
        {
            CreateMap<NewUserDTO, User>();
        }
    }
}