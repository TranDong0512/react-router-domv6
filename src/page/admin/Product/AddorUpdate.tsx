import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod'
import { Button } from '../../../lib/ui/Button/Button';
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof formSchema>

function FormComponent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema)
    });
    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", data);
        alert("Form submitted successfully!");
    };
    console.log(errors);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Registration Form</h2>
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                {/* Name Field */}
                <div style={styles.fieldContainer}>
                    <label htmlFor="name" style={styles.label}>
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register("name")}
                        style={styles.input}
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p style={styles.error}>{errors.name.message}</p>
                    )}
                </div>

                {/* Email Field */}
                <div style={styles.fieldContainer}>
                    <label htmlFor="email" style={styles.label}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        style={styles.input}
                        placeholder="Enter your email"
                    />
                    {errors.email && (
                        <p style={styles.error}>{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div style={styles.fieldContainer}>
                    <label htmlFor="password" style={styles.label}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        style={styles.input}
                        placeholder="Enter your password"
                    />
                    {errors.password && (
                        <p style={styles.error}>{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div>
                    <Button />
                </div>
            </form>
        </div>
    )

}
export default FormComponent

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: "400px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    fieldContainer: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        fontSize: "14px",
        fontWeight: 500,
        color: "#333",
        marginBottom: "5px",
    },
    input: {
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        outline: "none",
    },
    error: {
        color: "#d32f2f",
        fontSize: "12px",
        marginTop: "5px",
    },
    button: {
        padding: "10px",
        backgroundColor: "#3f51b5",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "14px",
        cursor: "pointer",
    },
};