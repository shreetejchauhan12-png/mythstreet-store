import { api } from "./api";

export async function getGarmentTypes() {

  const res = await api.get(
    "/api/lookups/garment-types"
  );

  return res.data.data || [];

}

export async function getColors() {

  const res = await api.get(
    "/api/lookups/colors"
  );

  return res.data.data || [];

}

export async function getSizes() {

  const res = await api.get(
    "/api/lookups/sizes"
  );

  return res.data.data || [];

}