namespace Domain.Entities
{

    /// <summary>
    /// Representa a entidade de persitência do Usuário (contendo Id, Name, Age e isDeleted)
    /// </summary>
    public class User
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required int Age { get; set; }
        // Atributo necessário para fazer um safe delete
        public required bool IsDeleted { get; set; }
    }
}
