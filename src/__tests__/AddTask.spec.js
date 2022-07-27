import React from "react";
import { render, cleanup,fireEvent } from "@testing-library/react";
import { AddTask } from "../components/AddTask";
import { useSelectedProjectValue } from "../context";


beforeEach(cleanup)
jest.mock("../context", () => ({
  useSelectedProjectValue: jest.fn(()=>({selectedProject:1})),
   useProjectsValue: jest.fn(() => ({ projects: [] })),
}));

jest.mock("../firebase", () => ({
  firebase: {
    firestore: jest.fn(() => ({
      collection: jest.fn(() => ({
        add: jest.fn(() => Promise.resolve('Never mock firebase')),
      })),
    })),
  },
}));

describe('<AddTask/>',() => {
afterEach(() => {
    jest.clearAllMocks();
});

describe("Success", () => {
it('renders the <AddTask/>',()=>{
    const {queryByTestId} = render(<AddTask />);
    expect(queryByTestId('add-task-comp')).toBeTruthy();
});
 it('renders the <AddTask /> quick overlay', () => {
      const setShowQuickAddTask = jest.fn();

      const { queryByTestId } = render(
        <AddTask
          showAddTaskMain
          shouldShowMain={false}
          showQuickAddTask
          setShowQuickAddTask={setShowQuickAddTask}
        />
      );
    expect(queryByTestId('quick-add-task')).toBeTruthy();
});

it('renders the <AddTask /> main showable using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });
     it('renders the <AddTask /> main showable using keyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();
 fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay when using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-project-overlay'));
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> project overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-project-overlay'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('project-overlay')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-project-overlay'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('project-overlay')).toBeTruthy();
    });

 it('renders the <AddTask /> task date overlay when using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('show-task-date-overlay'));
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

    it('renders the <AddTask /> task date overlay when using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('show-task-date-overlay'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('task-date-overlay')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-task-date-overlay'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('task-date-overlay')).toBeTruthy();
    });

 it('hides the <AddTask /> main when cancel is clicked using onClick', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-main-cancel'));
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

    it('hides the <AddTask /> main when cancel is clicked using onKeyDown', () => {
      const { queryByTestId } = render(<AddTask showAddTaskMain />);

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();

      fireEvent.keyDown(queryByTestId('show-main-action'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
        key: 'a',
        code: 65,
      });
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.keyDown(queryByTestId('add-task-main-cancel'), {
        key: 'Enter',
        code: 13,
      });
      expect(queryByTestId('add-task-main')).toBeFalsy();
    });

 it('renders <AddTask /> for quick add task and then clicks cancel using onClick', () => {
      const showQuickAddTask = true;
      const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
      const { queryByTestId } = render(
        <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
      );

      fireEvent.click(queryByTestId('show-main-action'));
      expect(queryByTestId('add-task-main')).toBeTruthy();

      fireEvent.click(queryByTestId('add-task-quick-cancel'));
      expect(setShowQuickAddTask).toHaveBeenCalled();
    });

})