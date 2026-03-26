using Application.Services;
using Application.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    /// <summary>
    /// Controller Responsável pelo Dashboard
    /// Responsável por buscar os totais de transações cruzando com as informações de categorias e usuários
    /// </summary>
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }


        [HttpGet("GetTotalByUser")]
        public async Task<ActionResult> GetTotalByUser()
        {
            try
            {
                var users = await _dashboardService.GetTotalByUserAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetTotalByCategory")]
        public async Task<ActionResult> GetTotalByCategory()
        {
            try
            {
                var categories = await _dashboardService.GetTotalByCategoryAsync();
                return Ok(categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
