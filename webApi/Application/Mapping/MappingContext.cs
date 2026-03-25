using Application.DTOs.CategoryDTOs;
using Application.DTOs.UserDTOs;
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
            // Mapeando UserDTO para User e vice-versa
            CreateMap<UserDTO, User>().ReverseMap();
            CreateMap<User, UserListDTO>();

            // Mapeando CategoryDTO para User e vice-versa
            CreateMap<CategoryDTO, Category>().ReverseMap();
            CreateMap<Category, CategoryListDTO>();
        }
    }
}