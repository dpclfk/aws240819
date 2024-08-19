import { ChangeEvent, useCallback, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo, getList, Todo as ITodo } from "../lib/todoAxios";

// interface IData {
//   value?: string;
// }

const TodoList = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");

  const client = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["get", "todo"],
    queryFn: getList,
  });

  // console.log(isLoading);
  // console.log(data);

  // console.log("asdasdaasdaszxxzc");
  //변수 선언 useState
  // const [list, setList] = useState<string[]>([]);
  //함수 선언 useCallback

  const onchange = useCallback(({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  }, []);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await addTodo({ title: inputValue });
    },
    onSuccess: () => {
      setInputValue("");
      client.invalidateQueries({ queryKey: ["get", "todo"] });
    },
    onError: () => {
      console.log("에러 발생");
    },
  });

  // const addHandler = useCallback(() => {
  //   // setList((state) => [...state, inputValue]);
  //   addTodo({ title: inputValue });
  //   setInputValue("");
  // }, [inputValue]);

  if (isLoading) return <div>now Loading</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input value={inputValue} onChange={onchange} type="text" />
        <button onClick={() => mutate()}>Add Todo</button>
      </div>

      <ul>
        {/* 아래는 Component로 작성 */}
        {data?.map((item: ITodo, idx: number) => (
          <li key={idx}>{item.title}</li>
        ))}
        {/* <li></li> */}
      </ul>
    </div>
  );
};

export default TodoList;
