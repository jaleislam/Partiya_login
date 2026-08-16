import React from "react";

export function Field({ icon: Icon, ...props }) {
  return (
    <div className="field">
      <Icon size={16} className="field-icon" aria-hidden="true" />
      <input {...props} />
    </div>
  );
}
