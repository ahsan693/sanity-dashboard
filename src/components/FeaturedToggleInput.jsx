import {useEffect, useMemo, useState} from 'react'
import {Flex, Stack, Switch, Text, useToast} from '@sanity/ui'
import {set, unset, useClient, useFormValue} from 'sanity'

const normalizeCarId = (id) => (typeof id === 'string' ? id.replace(/^drafts\./, '') : '')
const FEATURED_SLOTS = [1, 2, 3, 4]

export default function FeaturedToggleInput(props) {
  const {value, onChange, readOnly, id} = props
  const client = useClient({apiVersion: '2024-01-01'})
  const toast = useToast()
  const documentId = useFormValue(['_id'])

  const [otherFeaturedCount, setOtherFeaturedCount] = useState(0)
  const [loadingCount, setLoadingCount] = useState(true)

  const currentLogicalId = useMemo(() => normalizeCarId(documentId), [documentId])
  const hasAvailableSlot = otherFeaturedCount < 4
  const checked = Boolean(value)

  useEffect(() => {
    let mounted = true

    const loadFeaturedCount = async () => {
      setLoadingCount(true)

      try {
        const featuredDocs = await client.fetch(
          `*[_type == "car" && featured == true && defined(featuredOrder) && featuredOrder in $slots]{_id}`,
          {slots: FEATURED_SLOTS}
        )

        const count = new Set(
          featuredDocs
            .map((doc) => normalizeCarId(doc._id))
            .filter((carId) => carId && carId !== currentLogicalId)
        ).size

        if (mounted) setOtherFeaturedCount(count)
      } catch (error) {
        if (mounted) {
          setOtherFeaturedCount(0)
          toast.push({
            status: 'warning',
            title: 'Could not validate featured count',
            description: 'You can continue editing, but publish validation will still protect the 4-car limit.'
          })
        }
      } finally {
        if (mounted) setLoadingCount(false)
      }
    }

    loadFeaturedCount()

    return () => {
      mounted = false
    }
  }, [client, currentLogicalId, checked, toast])

  const disabled = readOnly || loadingCount || (!checked && !hasAvailableSlot)

  const handleChange = (event) => {
    const nextChecked = event.currentTarget.checked

    if (nextChecked && !hasAvailableSlot) {
      toast.push({
        status: 'warning',
        title: 'Maximum featured cars reached',
        description: 'Only 4 cars can be featured. Unfeature another car first.'
      })
      return
    }

    onChange(nextChecked ? set(true) : unset())
  }

  return (
    <Stack space={3}>
      <Flex align="center" gap={3}>
        <Switch
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
          aria-label="Featured on homepage"
        />
        <Text size={1}>
          Featured on homepage?
        </Text>
      </Flex>

      <Text size={1} muted>
        {loadingCount
          ? 'Checking featured slots...'
          : `Featured slots in use: ${otherFeaturedCount}${checked ? ' + this car' : ''} / 4`}
      </Text>

      {!checked && !hasAvailableSlot && (
        <Text size={1} tone="caution">
          All 4 featured slots are already used.
        </Text>
      )}

    </Stack>
  )
}
