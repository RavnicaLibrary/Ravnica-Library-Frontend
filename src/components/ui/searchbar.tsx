'use client';

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Initialize the router

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!query.trim()) return;

        setIsLoading(true);

        try {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        } catch (error) {
            console.error('Navigation failed:', error);
            setIsLoading(false); // Only reset loading if navigation fails
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex w-full max-w-sm items-center space-x-2">
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full"
            />
            <Button
                type="submit"
                disabled={isLoading}
            >
                {isLoading && (
                    <span className="absolute left-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12" cy="12" r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    </span>
                )}
                <span className={isLoading ? "pl-6" : ""}>
                    {isLoading ? 'Searching...' : 'Search'}
                </span>
            </Button>
        </form>
    );
}