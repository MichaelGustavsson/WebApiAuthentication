using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiAuthentication.Controllers
{
    [Authorize]
    public class DemoController : ApiController
    {
        public IHttpActionResult Get()
        {
            
            var demo = new
            {
                name = "Nigel Armstrong",
                email = "nigel.armstrong@learningtree.com"
            };
            return Ok(demo);
        }
    }
}
