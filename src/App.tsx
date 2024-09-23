import { useState } from "react";
import { Tree, Button } from "./components";

const defaultTextAreaValue = `[
  {
    "id": 1,
    "name": "Alice",
    "details": {
      "age": 30,
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "coordinates": {
          "latitude": 40.7128,
          "longitude": -74.0060
        }
      },
      "data": [
        42,
        "text",
        false,
        null,
        {
          "key": "value",
          "nestedArray": [
            {
              "item": "item1",
              "attributes": {
                "color": "red",
                "size": "large"
              }
            },
            {
              "item": "item2",
              "attributes": {
                "color": "blue",
                "size": "medium"
              }
            }
          ]
        }
      ]
    }
  },
  {
    "id": 2,
    "name": "Bob",
    "details": {
      "age": 25,
      "address": {
        "street": "456 Elm St",
        "city": "Othertown",
        "coordinates": {
          "latitude": 34.0522,
          "longitude": -118.2437
        }
      },
      "data": [
        "another string",
        3.14,
        true
      ]
    }
  }
]`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recursiveTree = (data: any) => {
  if (typeof data == "string" || typeof data == "number") {
    return <p>{data}</p>;
  }
  if (typeof data == "boolean") {
    return <p>{data.toString()}</p>;
  }
  if (Array.isArray(data)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((elem: any): any => {
      if (elem == null) {
        return undefined;
      }
      if (typeof elem == "string" || typeof elem == "number") {
        return <p key={elem.toString()}>{elem}</p>;
      }
      if (typeof elem == "boolean") {
        return <p key={elem.toString()}>{elem.toString()}</p>;
      }
      return recursiveTree(elem);
    });
  }
  if (typeof data == "object") {
    const arr = Object.entries(data);
    return arr.map(([k, v]) => {
      return (
        <Tree key={`${k}-${v}`} title={k}>
          {recursiveTree(v)}
        </Tree>
      );
    });
  }
};

function App() {
  const [data, setData] = useState<unknown[]>([]);
  const [isArray, setIsArray] = useState(false);

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const textarea = form.elements.namedItem(
            "code"
          ) as HTMLTextAreaElement;
          const textareaValue = textarea.value;
          try {
            const parsed = JSON.parse(textareaValue);
            if (Array.isArray(parsed)) {
              setData(parsed);
              setIsArray(true);
            } else {
              setData(Object.entries(parsed));
              setIsArray(false);
            }
          } catch {
            alert("Invalid JSON!");
          }
        }}
      >
        <textarea
          defaultValue={defaultTextAreaValue}
          name="code"
          rows={14}
          style={{
            width: "100%",
            border: "1px solid #4CAF50",
            borderRadius: "12px",
            padding: "8px",
          }}
        />
        <Button title="Submit" />

        {isArray
          ? data.map((k, i) => (
              <Tree title={`Object-${i}`}>{recursiveTree(k)}</Tree>
            ))
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as [any, any][]).map(([k, v]) => (
              <Tree key={`${k}-${v}`} title={k}>
                {recursiveTree(v)}
              </Tree>
            ))}
      </form>
    </div>
  );
}

export default App;
