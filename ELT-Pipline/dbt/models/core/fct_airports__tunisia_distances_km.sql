{{
    config({
        "materialized" : "table",
        "pre-hook": [
            "create extension if not exists tablefunc",
        ],
        "tags": [
            "distances",
        ],
    })
}}

with stg_airports__tunisia_distances as (

    select * from {{ ref('stg_airports__tunisia_distances') }}

)

select
    a_name,
    {{ get_b_name_columns() }}

from
    crosstab(
        'select
            a_name,
            b_name,
            distance_km
        from {{ this.schema }}.stg_airports__tunisia_distances',
        $$VALUES {{ get_b_name_value() }} $$
    ) as ct (
        a_name text, {{ get_b_name_type() }}
    )

order by 1 asc
