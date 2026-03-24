namespace Application.DTOs
{

    /// <summary>
    /// Representa a entidade de criação do Usuário (contendo apenas o Name e o Age)
    /// </summary>
    public class NewUserDTO
    {
        public required string Name { get; set; }
        public required int Age { get; set; }
    }
}
