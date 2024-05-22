import React from "react";

export default function SearchBar() {
  return (
    <section className="container mx-auto">
      <input
        type="text"
        placeholder="enter product name"
        className="w-full input input-bordered text-lg"
      />
    </section>
  );
}
