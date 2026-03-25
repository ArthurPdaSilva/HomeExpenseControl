using Domain.Enums;

namespace Domain.Entities
{

    /// <summary>
    /// Representa a entidade de persitência da Categoria (contendo Id, Description e Purpose)
    /// </summary>
    public class Category
    {
        public Guid Id { get; set; }
        public required string Description { get; set; }
        // Atributo responsável pelas categorias
        public required PurposeType Purpose { get; set; }
    }
}
