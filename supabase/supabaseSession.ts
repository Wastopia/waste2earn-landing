import React, { useState, useEffect } from 'react'
import supabase from '../supabase/supabase'

function supabaseSession() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [userDetails, setUserDetails] = useState(null)
    

    useEffect(() => {
        
        let subscription
    
        const session = async () => {
            
            try {
                setLoading(true)

                const { data: { session: supabaseSession } } = await supabase.auth.getSession()
    
                if (!supabaseSession) {
                    console.log('supabaseSession error')
                    return
                }

                const { data: sessionData, error: sessionError } = await supabase.auth.getUser(supabaseSession.access_token)
    
                if (sessionError) {
                    await supabase.auth.signOut()
                    console.log('sessionError')
                    return
                }

                if (sessionData) {

                    const session = sessionData.user

                    const { data: userDetails, error: userDetailsError } = await supabase
                        .from('users')
                        .select('*')
                        .eq('auth_id', session.id)
                        .single()

                    if (userDetailsError) {
                        console.log('userDetailsError')
                    }

                    if (userDetails) {
                        setUserDetails(userDetails)

                    }
                    
                }

            } catch (error) {
                console.log('error')
            } finally {
                setTimeout(() => 
                    setLoading(false), 240
                ) 
            }
        }
    
        session()
    }, [])

    return {
        loading,
        setLoading,
        user,
        setUser,
        userDetails,
        setUserDetails
    }
}

export default supabaseSession