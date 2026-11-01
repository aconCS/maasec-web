"use client";

import { Button } from "@/components/ui/button";

/** Opens the browser's print dialog, where "Save as PDF" is also offered. */
export function PrintButton() {
  return (
    <Button type="button" size="md" onClick={() => window.print()} className="print:hidden">
      Print or save as PDF
    </Button>
  );
}
