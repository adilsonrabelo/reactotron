/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react"

import TimelineFilterModal from "./index"
import { CommandType } from "reactotron-core-contract"

export default {
  title: "Timeline Filter Modal",
}

export const AllOn = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const StatusFilter = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[]}
    availableStatusCategories={["success", "redirect", "clientError", "serverError"]}
    hiddenStatusCategories={["clientError", "serverError"]}
    setHiddenStatusCategories={() => {}}
  />
)

export const LogOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.Log]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const ImageOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.Image]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const CustomDisplayOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.Display]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const ConnectionOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.ClientIntro]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const BenchmarkOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.Benchmark]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const APIOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.ApiResponse]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const MutationsOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.AsyncStorageMutation]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const ActionOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.StateActionComplete]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const SagaOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.SagaTaskComplete]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const SubscriptionOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[CommandType.StateValuesChange]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)

export const AllOff = () => (
  <TimelineFilterModal
    isOpen
    onClose={() => {}}
    setHiddenCommands={() => {}}
    hiddenCommands={[
      CommandType.Log,
      CommandType.Image,
      CommandType.Display,
      CommandType.ClientIntro,
      CommandType.Benchmark,
      CommandType.ApiResponse,
      CommandType.AsyncStorageMutation,
      CommandType.StateActionComplete,
      CommandType.SagaTaskComplete,
      CommandType.StateValuesChange,
    ]}
    availableStatusCategories={[]}
    hiddenStatusCategories={[]}
    setHiddenStatusCategories={() => {}}
  />
)
