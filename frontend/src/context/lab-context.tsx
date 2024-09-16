import { createContext, useState } from "react";

interface labContextProps {
  selectSemester: string;
  setSelectedSemester: React.Dispatch<React.SetStateAction<string>>;
  selectGroup: string;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string>>;
  selectCourse: string;
  setSelectedCourse: React.Dispatch<React.SetStateAction<string>>;
}

export const CreateLabContext = createContext<null | labContextProps>(null);

export const LabContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectSemester, setSelectedSemester] = useState("");
  const [selectGroup, setSelectedGroup] = useState("");
  const [selectCourse, setSelectedCourse] = useState("");
  return (
    <CreateLabContext.Provider
      value={{
        selectCourse,
        selectGroup,
        selectSemester,
        setSelectedCourse,
        setSelectedGroup,
        setSelectedSemester,
      }}
    >
      {children}
    </CreateLabContext.Provider>
  );
};
