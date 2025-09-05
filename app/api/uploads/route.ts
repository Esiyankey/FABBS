import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const alt = formData.get("alt") as string;
    const category = formData.get("category") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    
    const filePath = `images/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("Uploads")
      .upload(filePath, buffer, {
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

  
    const { data: urlData } = supabase.storage
      .from("Uploads")
      .getPublicUrl(filePath);

    const src = urlData.publicUrl;

  
    const { data: inserted, error: insertError } = await supabase
      .from("files")
      .insert([
        {
          src,
          alt,
          category,
        },
      ])
      .select();

    if (insertError) throw insertError;

    return NextResponse.json({ photo: inserted[0] });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
