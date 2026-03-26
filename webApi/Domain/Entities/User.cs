namespace Domain.Entities
{

    /// <summary>
    /// Representa a entidade de persitência do Usuário (contendo Id, Name, Age e isDeleted)
    /// </summary>
    public class User : BaseEntity
    {
        public required string Name { get; set; }
        public required int Age { get; set; }

        // Adicionando uma referencia em Usuário a lista de Transactions para dar o safe delete
        public required ICollection<Transaction> Transactions { get; set; }
        // Atributo necessário para fazer um soft delete
        public required bool IsDeleted { get; set; }
    }
}
