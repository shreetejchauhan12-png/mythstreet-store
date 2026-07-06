"use client";

import { useEffect, useState } from "react";

import {
  getGarmentTypes,
  getColors,
  getSizes,
} from "@/services/lookups";

export function useLookups() {

  const [garmentTypes, setGarmentTypes] = useState<any[]>([]);
  const [colors, setColors] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const [
          garments,
          colors,
          sizes,
        ] = await Promise.all([
          getGarmentTypes(),
          getColors(),
          getSizes(),
        ]);

        setGarmentTypes(garments);
        setColors(colors);
        setSizes(sizes);

      } catch (error) {

        console.error(
          "LOOKUPS ERROR:",
          error
        );

      } finally {

        setLoading(false);

      }

    }

    load();

  }, []);

  return {

    garmentTypes,

    colors,

    sizes,

    loading,

  };

}