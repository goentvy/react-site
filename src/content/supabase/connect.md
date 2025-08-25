# Supabase Connect

## 1. Supabase 설치 및 계정만들기

[supabase.com](https://supabase.com/) 홈페이지로 이동하셔서 계정을 생성해주세요.

메인페이지 Start your project를 누르거나 프로필 All Projects을 누르면 Your Organizations 페이지가 나옵니다.

해당 페이지에서 New organization을 클릭해 organization을 생성해줍니다.

Name에 회사나 팀 이름을 작성해주시고 plan은 Free로 지정하시면 됩니다.

organization을 생성하셨다면 New project 생성해주시고 

해당 대시보드에 들어가시면 header 상단에 Connect 버튼이 있습니다.

다양한 Connect 방법이 있지만 App Frameworks로 가셔서 개발환경에 맞춰 설정해주시면 됩니다.

저는 Framework - React , Using - Vite , With - Supabase-js 로 맞추겠습니다.

그러면 .env 파일을 생성하셔서 화면에 보이는 해당 내용을 복사하셔서 넣어주시면 됩니다.

```
VITE_SUPABASE_URL = "Your SUPABASE URL"
VITE_SUPABASE_ANON_KEY = "Your ANON KEY"
```

그 다음으로 .env 파일에 있는 DB URL과 KEY를 이용해 supabase 연동하는 방법입니다.

utils/supabase.ts 파일을 생성하셔서 해당내용을 복사붙여넣기 하시면 됩니다.

```ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase
```

import.meta.env.VITE_SUPABASE_URL는 .env 파일에 접근해 해당 URL String값을 가져오는부분이며 마찬가지로

import.meta.env.VITE_SUPABASE_ANON_KEY는 .env 파일에 접근해 KEY String 값을 가져와 사용한다고 보시면 됩니다.

client를 생성하는 createClient를 import 해오며 supabase 변수에 생성한 
Client를 넣어 export default를 통해 어디서든 불러와 사용할수 있도록 해줍니다.

```ts

import { useState, useEffect } from 'react'
// supabase DB에 연동한 client를 불러옵니다.
import { supabase } from '../utils/supabase'

function Page() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    function getTodos() {
        // DB 'todos' Table에 있는 데이터를 todos 변수에 넣어줍니다.
      const { data: todos } = await supabase.from('todos').select()
        // todos 내용이 있다면 todos state 상태값 변경.
      if (todos.length > 1) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <div>
      {todos.map((todo) => (
        <li key={todo}>{todo}</li>
      ))}
    </div>
  )
}
export default Page
```

해당 코드는 supabase todos라는 테이블에 있는 내용을 가지고오는 코드입니다.
