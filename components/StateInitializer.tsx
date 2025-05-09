'use client';

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getFromLocalStorage } from "@/utils/localStorage";
import { resetState } from "@/store/dashboardSlice";
import { AppState } from "@/store";

const StateInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedState = getFromLocalStorage() as AppState;
    if (savedState) {
      dispatch(resetState(savedState.dashboard));
    }
  }, [dispatch]);

  return null;
};

export default StateInitializer;