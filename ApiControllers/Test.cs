using Microsoft.AspNet.Authorization;
using Microsoft.AspNet.Mvc;

namespace SimpleAdal.ApiControllers
{
	[Authorize(ActiveAuthenticationSchemes = "Bearer")]
	public class TestController
	{
		[Route("/api/test")]
		public string[] Test()
		{
			return new string[] { "one", "two", "three" };
		}
	}
}