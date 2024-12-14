package com.projetodevwevavancado.emprestimo.commons.enums;

public enum UserRole {
	ADMIN("admin"), USER("user");

	private String role;

	UserRole(String role) {
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public static UserRole fromValue(String value) {
		for (UserRole role : UserRole.values()) {
			if (role.getRole().equalsIgnoreCase(value)) {
				return role;
			}
		}
		throw new IllegalArgumentException("Unknown value: " + value);
	}
}
