import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nip: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login.post'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="w-full lg:w-4/12">
                <div>
                    <p className="text-4xl font-bold">SELAMAT DATANG</p>
                    <p className="">Silahkan Log-in agar dapat mengakses database</p>
                </div>
                <form onSubmit={submit} className="mt-12">
                    <div>
                        <InputLabel htmlFor="nip" value="NIP" />

                        <TextInput
                            id="nip"
                            type="text"
                            name="nip"
                            value={data.nip}
                            className="mt-1 block w-full border-orange-500 focus:border-orange-600 focus:ring-orange-600"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('nip', e.target.value)}
                        />

                        <InputError message={errors.nip} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full border-orange-500 focus:border-orange-600 focus:ring-orange-600"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-4 flex justify-between">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                            />
                            <span className="ms-2 text-sm text-gray-600">
                                Remember me
                            </span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="rounded-md text-sm text-orange-400 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                Forgot your password?
                            </Link>
                        )}
                    </div>

                    <div className="mt-4 flex items-center justify-center">

                        <PrimaryButton className="w-1/2 justify-center py-3" disabled={processing}>
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}
