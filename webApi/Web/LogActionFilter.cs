using Microsoft.AspNetCore.Mvc.Filters;

namespace Web
{
    /// <summary>
    /// Serviço responsável por mostrar logs personalizados
    /// Exemplo: info: Web.LogActionFilter[0]
    /// Executando ação: Web.Controllers.UserController.Delete(Web)
    /// </summary>
    public class LogActionFilter : IActionFilter
    {
        private readonly ILogger<LogActionFilter> _logger;

        public LogActionFilter(ILogger<LogActionFilter> logger)
        {
            _logger = logger;
        }


        // Mostrar no console a ação executada
        public void OnActionExecuting(ActionExecutingContext context)
        {
            _logger.LogInformation("Executando ação: {ActionName}", context.ActionDescriptor.DisplayName);
        }

        // Mostrar qual ação foi executada no console
        public void OnActionExecuted(ActionExecutedContext context)
        {
            _logger.LogInformation("Ação executada: {ActionName}", context.ActionDescriptor.DisplayName);
        }
    }
}
