package com.abucin.issueTracker.entity;

import java.io.Serializable;
import javax.persistence.Entity;

/**
 * Entity that defines the permissions available.
 *
 * @author ABucin
 */
@Entity
public class Permission extends AbstractEntity implements Serializable {

    /**
     * The permission name.
     */
    private String name;
    /**
     * The permission description.
     */
    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
