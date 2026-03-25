using Application.DTOs.CategoryDTOs;
using Application.DTOs.TransactionDTOs;
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

            // Mapeando Transaction para DTO
            CreateMap<TransactionDTO, Transaction>().ReverseMap();

            //Realizando o mapeamento de Transaction para TransactionListDTO, incluindo os campos de UserName e CategoryDescription para facilitar a exibição nas tabelas
            CreateMap<Transaction, TransactionListDTO>()
                .ForMember(dest => dest.UserName, 
                           opt => opt.MapFrom(src => src.User != null ? src.User.Name : string.Empty))
                .ForMember(dest => dest.CategoryDescription, 
                           opt => opt.MapFrom(src => src.Category != null ? src.Category.Description : null));
        }
    }
}