import React, { useEffect, useState } from "react";

const MockApi = (callback) => {
  let count = Math.round(Math.random());

  setTimeout(() => {
    if (count % 2 === 0) {
      callback({ success: true, error: false });
    }
    if (count % 2 === 1) {
      callback({ success: false, error: true });
    }
  }, 2000);
};

export default MockApi;
