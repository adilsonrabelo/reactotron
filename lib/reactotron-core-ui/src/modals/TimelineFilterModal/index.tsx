import React, { FunctionComponent } from "react"
import styled from "styled-components"

import Modal from "../../components/Modal"
import Checkbox from "../../components/Checkbox"
import type { CommandTypeKey } from "reactotron-core-contract"
import { CommandType } from "reactotron-core-contract"
import { STATUS_CATEGORY_LABELS } from "../../components/StatusCodeTag"
import type { StatusCategory } from "../../components/StatusCodeTag"

const GROUPS = [
  {
    name: "Informational",
    items: [
      { value: CommandType.Log, text: "Log" },
      { value: CommandType.Image, text: "Image" },
      { value: CommandType.Display, text: "Custom Display" },
    ],
  },
  {
    name: "General",
    items: [
      { value: CommandType.ClientIntro, text: "Connection" },
      { value: CommandType.Benchmark, text: "Benchmark" },
      { value: CommandType.ApiResponse, text: "API" },
    ],
  },
  {
    name: "Async Storage",
    items: [{ value: CommandType.AsyncStorageMutation, text: "Mutations" }],
  },
  {
    name: "State & Sagas",
    items: [
      { value: CommandType.StateActionComplete, text: "Action" },
      { value: CommandType.SagaTaskComplete, text: "Saga" },
      { value: CommandType.StateValuesChange, text: "Subscription Changed" },
    ],
  },
]

const BulkActionContainer = styled.div`
  margin-bottom: 20px;
`
const BulkAction = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.tag};
`

const GroupName = styled.div`
  font-size: 18px;
  margin: 10px 0;
  padding-bottom: 2px;
  border-bottom: 1px solid ${(props) => props.theme.highlight};
  color: ${(props) => props.theme.foregroundLight};
`

interface Props {
  isOpen: boolean
  onClose: () => void
  hiddenCommands: CommandTypeKey[]
  setHiddenCommands: (hiddenCommands: CommandTypeKey[]) => void
  availableStatusCategories: StatusCategory[]
  hiddenStatusCategories: StatusCategory[]
  setHiddenStatusCategories: (statusCategories: StatusCategory[]) => void
}

const TimelineFilterModal: FunctionComponent<Props> = ({
  isOpen,
  onClose,
  hiddenCommands,
  setHiddenCommands,
  availableStatusCategories,
  hiddenStatusCategories,
  setHiddenStatusCategories,
}) => {
  const toggleAllOn = () => {
    // To turn everything on we need the list to be empty.
    setHiddenCommands([])
    setHiddenStatusCategories([])
  }

  const toggleAllOff = () => {
    // To turn everything off we need the list to have all options.
    setHiddenCommands(
      GROUPS.reduce((itms, g) => {
        return [...itms, ...g.items.map((i) => i.value)]
      }, [])
    )
    setHiddenStatusCategories(availableStatusCategories)
  }

  const buildCheckboxToggle = (value: CommandTypeKey) => {
    const isSelected = hiddenCommands.indexOf(value) === -1

    return () => {
      if (isSelected) {
        setHiddenCommands([...hiddenCommands, value])
      } else {
        setHiddenCommands([...hiddenCommands.filter((f) => f !== value)])
      }
    }
  }

  const buildStatusCategoryToggle = (category: StatusCategory) => {
    const isSelected = hiddenStatusCategories.indexOf(category) === -1

    return () => {
      if (isSelected) {
        setHiddenStatusCategories([...hiddenStatusCategories, category])
      } else {
        setHiddenStatusCategories([...hiddenStatusCategories.filter((f) => f !== category)])
      }
    }
  }

  return (
    <Modal title="Timeline Filter" isOpen={isOpen} onClose={onClose}>
      <BulkActionContainer>
        <BulkAction onClick={toggleAllOn}>Check all</BulkAction>
        <span> / </span>
        <BulkAction onClick={toggleAllOff}>Uncheck all</BulkAction>
      </BulkActionContainer>
      <div>
        {GROUPS.map((section, sectionIdx) => {
          const options = section.items.map((item, itemIdx) => {
            const isChecked = hiddenCommands.indexOf(item.value) === -1
            const onToggle = buildCheckboxToggle(item.value)

            return (
              <Checkbox key={itemIdx} label={item.text} onToggle={onToggle} isChecked={isChecked} />
            )
          })

          return (
            <div key={sectionIdx}>
              <GroupName>{section.name}</GroupName>
              {options}
            </div>
          )
        })}
        {availableStatusCategories.length > 0 && (
          <div>
            <GroupName>Status</GroupName>
            {availableStatusCategories.map((category) => {
              const isChecked = hiddenStatusCategories.indexOf(category) === -1
              const onToggle = buildStatusCategoryToggle(category)

              return (
                <Checkbox
                  key={category}
                  label={STATUS_CATEGORY_LABELS[category]}
                  onToggle={onToggle}
                  isChecked={isChecked}
                />
              )
            })}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default TimelineFilterModal
