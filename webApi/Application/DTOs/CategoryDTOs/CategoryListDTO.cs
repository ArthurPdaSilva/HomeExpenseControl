using Domain.Enums;

namespace Application.DTOs.CategoryDTOs
{

    /// <summary>
    /// Representa a entidade de transfêrencia de listagem da Categoria (contendo o Id, Description e o Purpose)
    /// </summary>
    public class CategoryListDTO
    {
        public required Guid Id { get; set; }
        public required string Description { get; set; }
        public required EPurposeType Purpose { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
