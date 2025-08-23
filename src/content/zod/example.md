# Zod 사용 예제

## 기술 스택

#### UI: ShadCN UI (Tailwind 기반 컴포넌트)
#### Form 관리 : React Hook Form
#### 검증 : Zod + @hookform/resolvers/zod

## 1. Zod 스키마 정의
```ts
// shcemas/signupSchema.ts
import { z } from "zod";

export const signupSchema = z.object({
    username: z.string().min(3, "닉네임은 최소 3자 이상이어야 합니다."),
    email: z.string().email("유효한 이메일을 입력하세요."),
    password: z.string().min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
});

export type SignupFormValues = z.infer<typeof signupSchema>;
```

## 2. React Hook Form + ShadCN UI 적용
```ts
// components/SignupForm.tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "@/schemas/signupSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignupForm() {
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: SignupFormValues) => {
        console.log("회원가입 데이터: ", values);
        // API 호출 또는 상태 업데이트
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>닉네임</FormLabel>
                        <Input {...field} />
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <Input type="email" {...field} />
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>비밀번호</FormLabel>
                        <Input type="password" {...field} />
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>비밀번호 확인</FormLabel>
                        <Input type="password" {...field} />
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">회원가입</Button>
            </form>
        </Form>
    )
}
```

FormMessage는 Zod의 에러 메시지를 자동으로 보여줘서 UX가 깔끔해집니다.
FormField와 FormItem은 ShadCN UI의 폼 컴포넌트 구조라 커스터마이징이 쉽습니다.
defaultValues는 초기값 설정에 꼭 필요합니다. (uncontrolled 에러 위험)
