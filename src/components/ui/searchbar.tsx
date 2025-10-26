'use client';

import {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsLoading(true);
        try {
            // always navigate to page 1 for a fresh search
            router.push(`/search?q=${encodeURIComponent(query)}&page=1`);
        } finally {
            // we don't setIsLoading(false) here because router.push will navigate away;
            // if navigation fails, Next will keep the component mounted — clear loading in catch if desired
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
                {isLoading ? 'Searching...' : 'Search'}
            </Button>
        </form>
    );
}