using Domain.Enums;

namespace Domain.Entities
{

    /// <summary>
    /// Representa a entidade de persitência da Categoria (contendo Id, Description e Purpose)
    /// </summary>
    public class Category : BaseEntity
    {
        public required string Description { get; set; }
        // Atributo responsável pelas categorias
        public required EPurposeType Purpose { get; set; }
        // Adicionando uma referencia em Categoria a lista de Transactions para facilitar a consulta por total de transferência por categoria
        public required ICollection<Transaction> Transactions { get; set; }
    }
}
