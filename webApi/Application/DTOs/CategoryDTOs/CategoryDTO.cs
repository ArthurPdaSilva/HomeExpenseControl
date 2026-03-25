using Domain.Enums;

namespace Application.DTOs.CategoryDTOs 
{

    /// <summary>
    /// Representa a entidade de transfêrencia de Categoria (contendo Description e o Purpose)
    /// </summary>
    public class CategoryDTO
    {
        public required string Description { get; set; }
        public required PurposeType Purpose { get; set; }
    }
}
