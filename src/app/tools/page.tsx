import Link from "next/link";
import * as React from "react";

export default function ToolsPage() {
  return (
    <main className="flex flex-col items-center justify-between p-10 gap-10">
      <h1 className="text-3xl font-bold">Tools</h1>
      <ul>
        <li>
          <Link href="/tools/timezone">Timezone Converter</Link>
        </li>
      </ul>
    </main>
  );
}
