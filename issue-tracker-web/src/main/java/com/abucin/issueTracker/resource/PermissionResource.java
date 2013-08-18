package com.abucin.issueTracker.resource;

import java.security.Permission;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

/**
 * Resource for the {@link Permission} entity.
 *
 * @author ABucin
 */
public class PermissionResource extends AbstractResource {

    @GET
    @Path("/permission/{key: [a-zA-Z0-9]*}")
    @Produces("text/json")
    public String get(@PathParam("key") String key) {
        return "GET";
    }
}
