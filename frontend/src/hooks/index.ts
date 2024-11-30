import { BACKEND_URL } from "@/config"
import axios from "axios"
import { useEffect, useState } from "react"

interface BlogsType {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<BlogsType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response => {
                setBlogs(response.data.blogs)
                setLoading(false)
            }))
    }
        , []
    )
    
    return {
        loading,
        blogs
    }
}

interface BlogType {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export const useBlog = ({id}: {id: string}) => {
    const [blogs, setBlog] = useState<BlogType>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response => {
                setBlog(response.data)
                setLoading(false)
            }))
    }
        , []
    )
    
    return {
        loading,
        blogs
    }
}