using Application.DTOs.CategoryDTOs;
using Application.Services.Interfaces;
using AutoMapper;
using Domain.Entities;
using Domain.Repositories.Interfaces;
using FluentValidation;

namespace Application.Services
{
    /// <summary>
    /// Serviço responsável por realizar as operações e validações envolvendo a Categoria
    /// </summary>
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IValidator<CategoryDTO> _validator;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IValidator<CategoryDTO> validator)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _validator = validator;
        }

        public void Create(CategoryDTO category)
        {
            _validator.ValidateAndThrow(category);
            var newCategory = _mapper.Map<Category>(category);
            _categoryRepository.Create(newCategory);
        }

        public IList<CategoryListDTO> GetAll()
        {
            var categories = _categoryRepository.GetAll();
            return _mapper.Map<IList<CategoryListDTO>>(categories);
        }

        public CategoryDTO GetById(Guid id)
        {
            var category = _categoryRepository.GetById(id);
            if (category is null)
            {
                throw new Exception("Categoria não encontrada");
            }
            return _mapper.Map<CategoryDTO>(category);
        }
    }
}
