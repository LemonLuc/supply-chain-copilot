export const personas = [
  { id: "logistics", label: "Standard logistics employee" },
  { id: "procurement", label: "Procurement lead" },
] as const;

export type PersonaId = (typeof personas)[number]["id"];

const personaPolicies: Record<PersonaId, { canViewSupplierImpact: boolean }> = {
  logistics: { canViewSupplierImpact: false },
  procurement: { canViewSupplierImpact: true },
};

export function normalizePersona(value: unknown): PersonaId {
  return value === "procurement" ? "procurement" : "logistics";
}

export function getPersonaPolicy(value: unknown) {
  return personaPolicies[normalizePersona(value)];
}
