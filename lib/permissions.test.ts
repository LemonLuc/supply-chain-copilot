import { describe, expect, it } from "vitest";

import { getPersonaPolicy, normalizePersona, personas } from "./permissions";

describe("persona permissions", () => {
  it("defaults unknown personas to the least-privileged logistics role", () => {
    expect(normalizePersona("unknown")).toBe("logistics");
    expect(normalizePersona(undefined)).toBe("logistics");
  });

  it("grants supplier impact access only to procurement leads", () => {
    expect(getPersonaPolicy("logistics").canViewSupplierImpact).toBe(false);
    expect(getPersonaPolicy("procurement").canViewSupplierImpact).toBe(true);
  });

  it("exposes the two demo personas with logistics first", () => {
    expect(personas).toEqual([
      { id: "logistics", label: "Standard logistics employee" },
      { id: "procurement", label: "Procurement lead" },
    ]);
  });
});
